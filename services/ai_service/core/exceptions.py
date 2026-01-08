
class BaseException(Exception):
    def __init__(self, message: str, status_code: int):
        self.message = message
        self.status_code = status_code
        super().__init__(self.message)

class UserNotFoundException(BaseException):
    def __init__(self):
        super().__init__(message="User not found", status_code=404)

class UserAlreadyExistsException(BaseException):
    def __init__(self):
        super().__init__(message="User already exists", status_code=400)