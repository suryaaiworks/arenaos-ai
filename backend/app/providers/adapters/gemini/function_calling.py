from typing import Any, Dict, List
from google.genai import types
from app.toolkit.base.manifest import ToolManifest
from app.toolkit.registry.registry import tool_registry
from app.toolkit.executor.executor import ToolExecutor
from app.toolkit.tasks import ToolTask
from loguru import logger

class GeminiFunctionCallingBinder:
    """
    Binds the local Tool Calling Framework into Google GenAI types.FunctionDeclaration.
    Converts manifests and executes tool requests from models.
    """
    def convert_manifest_to_declaration(self, manifest: ToolManifest) -> types.FunctionDeclaration:
        logger.debug(f"GeminiFC: Converting manifest for tool '{manifest.name}' to FunctionDeclaration...")
        
        # Build recursively
        gemini_parameters = self._dict_to_gemini_schema(manifest.input_schema)
        
        return types.FunctionDeclaration(
            name=manifest.name,
            description=manifest.description,
            parameters=gemini_parameters
        )

    def _dict_to_gemini_schema(self, schema_dict: Dict[str, Any]) -> types.Schema:
        if not schema_dict:
            return None
            
        type_str = schema_dict.get("type", "object")
        
        # Map string type to types.Type enum
        type_map = {
            "object": types.Type.OBJECT,
            "string": types.Type.STRING,
            "integer": types.Type.INTEGER,
            "number": types.Type.NUMBER,
            "boolean": types.Type.BOOLEAN,
            "array": types.Type.ARRAY,
        }
        gemini_type = type_map.get(type_str.lower(), types.Type.OBJECT)
        
        properties = {}
        if "properties" in schema_dict:
            for k, v in schema_dict["properties"].items():
                prop_schema = self._dict_to_gemini_schema(v)
                if prop_schema:
                    properties[k] = prop_schema
                    
        items = None
        if "items" in schema_dict:
            items = self._dict_to_gemini_schema(schema_dict["items"])
            
        return types.Schema(
            type=gemini_type,
            properties=properties or None,
            required=schema_dict.get("required", None),
            items=items,
            description=schema_dict.get("description", None),
            enum=schema_dict.get("enum", None),
        )

    async def execute_tool_call(self, name: str, args: Dict[str, Any]) -> Dict[str, Any]:
        """
        Executes raw Gemini function request payload through the local Tool Calling Framework.
        """
        logger.info(f"GeminiFC: Executing function call hook '{name}' with args {args}...")
        try:
            tool = tool_registry.get_tool(name)
            executor = ToolExecutor()
            # Construct ToolTask
            task = ToolTask(
                tool_name=name,
                agent_name="GeminiProvider",
                payload=args,
                permissions=tool.manifest.permissions
            )
            res = await executor.execute(task, tool)
            
            logger.info(f"GeminiFC: Tool '{name}' execution completed with status '{res.status}'")
            return {
                "status": res.status,
                "result": res.result,
                "errors": res.errors
            }
        except Exception as e:
            logger.exception(f"GeminiFC: Function call hook execution error: {e}")
            return {
                "status": "failed",
                "result": {},
                "errors": [str(e)]
            }
