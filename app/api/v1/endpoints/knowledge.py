from fastapi import APIRouter, HTTPException, status
from app.knowledge.engine import knowledge_engine
from app.knowledge.schemas import RuleEvaluationRequest, KnowledgeResponse
from app.knowledge.health import KnowledgeHealthChecker
from loguru import logger

router = APIRouter()
health_checker = KnowledgeHealthChecker()

@router.get("/search", response_model=list, status_code=status.HTTP_200_OK)
async def search_knowledge(q: str = ""):
    """
    Searches stadium operational rule playbooks matching search tokens.
    """
    logger.info(f"API: Request to search knowledge for query '{q}'...")
    return knowledge_engine.search_playbooks(q)


@router.post("/evaluate", response_model=KnowledgeResponse, status_code=status.HTTP_200_OK)
async def evaluate_knowledge_rules(req: RuleEvaluationRequest):
    """
    Evaluates rules and matches policies based on active operational context.
    """
    logger.info(f"API: Request to evaluate knowledge rules for category '{req.category}'...")
    try:
        return knowledge_engine.evaluate_policies(req.category, req.context)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )


@router.get("/policies", response_model=list, status_code=status.HTTP_200_OK)
async def get_stadium_policies():
    """
    Returns active stadium policy guidelines list.
    """
    logger.info("API: Querying active policies guidelines catalog...")
    policies = knowledge_engine.list_policies()
    return [p.model_dump() for p in policies]


@router.get("/rules", response_model=list, status_code=status.HTTP_200_OK)
async def get_stadium_rules():
    """
    Returns active stadium logic rules list.
    """
    logger.info("API: Querying active logic rules catalog...")
    rules = knowledge_engine.list_rules()
    return [r.model_dump() for r in rules]


@router.get("/health", response_model=dict, status_code=status.HTTP_200_OK)
async def get_knowledge_health():
    """
    Returns diagnostic health and uptime summary parameters for the Knowledge Engine.
    """
    logger.info("API: Auditing Knowledge Engine health status...")
    return health_checker.get_health_report()
