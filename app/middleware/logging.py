import time
from fastapi import Request, Response
from starlette.middleware.base import BaseHTTPMiddleware
from loguru import logger

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """
    HTTP Middleware to calculate request latency and log method, path, status code.
    """
    async def dispatch(self, request: Request, call_next) -> Response:
        start_time = time.time()
        
        # Log request ingress details
        method = request.method
        path = request.url.path
        query = request.url.query
        client_host = request.client.host if request.client else "unknown"
        
        # Process request pipeline
        try:
            response = await call_next(request)
            process_time = (time.time() - start_time) * 1000
            
            # Color status output
            status_code = response.status_code
            if status_code >= 500:
                logger.error(f"{method} {path} - Host: {client_host} | Status: {status_code} | Latency: {process_time:.2f}ms")
            elif status_code >= 400:
                logger.warning(f"{method} {path} - Host: {client_host} | Status: {status_code} | Latency: {process_time:.2f}ms")
            else:
                logger.info(f"{method} {path} - Host: {client_host} | Status: {status_code} | Latency: {process_time:.2f}ms")
                
            response.headers["X-Process-Time-MS"] = f"{process_time:.2f}"
            return response
            
        except Exception as exc:
            process_time = (time.time() - start_time) * 1000
            logger.exception(f"{method} {path} failed - Host: {client_host} | Latency: {process_time:.2f}ms | Error: {exc}")
            raise exc
