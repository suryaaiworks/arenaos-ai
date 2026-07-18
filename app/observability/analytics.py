import time
from typing import List

class ObservabilityAnalytics:
    """
    Computes requests RPM (requests per minute) throughput statistics.
    """
    def __init__(self):
        self._timestamps: List[float] = []

    def record_request(self) -> None:
        self._timestamps.append(time.time())
        # Prune older than 60s
        now = time.time()
        self._timestamps = [t for t in self._timestamps if now - t < 60.0]

    def get_requests_per_minute(self) -> float:
        now = time.time()
        self._timestamps = [t for t in self._timestamps if now - t < 60.0]
        return float(len(self._timestamps))
