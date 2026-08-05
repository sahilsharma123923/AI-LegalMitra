import hashlib
import hmac
import os


def hash_password(password: str):
    salt = hashlib.sha256(os.urandom(16)).digest()
    derived = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        100_000,
    )
    return f"pbkdf2_sha256${salt.hex()}${derived.hex()}"


def verify_password(password: str, hashed_password: str):
    if not hashed_password.startswith("pbkdf2_sha256$"):
        return False

    _, salt_hex, expected_hex = hashed_password.split("$")
    salt = bytes.fromhex(salt_hex)
    derived = hashlib.pbkdf2_hmac(
        "sha256",
        password.encode("utf-8"),
        salt,
        100_000,
    )

    return hmac.compare_digest(derived.hex(), expected_hex)