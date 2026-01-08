from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI

from api.core_routes import router as core_router
from api.user_routes import router as user_router
from api.task_routes import router as task_router
from core.exceptions import BaseException, UserNotFoundException, UserAlreadyExistsException
from fastapi.responses import JSONResponse
from fastapi import Request
from fastapi.exceptions import RequestValidationError

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Start User API")
    yield
    print("End User API")

app = FastAPI(
    title="User API",
    lifespan=lifespan
)
app.include_router(core_router)
app.include_router(user_router)
app.include_router(task_router)


@app.exception_handler(BaseException)
def handle_base_exception(request: Request, exc: BaseException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.message}
    )

@app.exception_handler(UserNotFoundException)
def handle_user_not_found_exception(request: Request, exc: UserNotFoundException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.message}
    )

@app.exception_handler(UserAlreadyExistsException)
def handle_user_already_exists_exception(request: Request, exc: UserAlreadyExistsException):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.message}
    )

@app.exception_handler(RequestValidationError)
def handle_request_validation_error(request: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=exc.status_code,
        content={"message": exc.message}
    )

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)