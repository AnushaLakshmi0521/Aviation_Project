
import ssl
import certifi

print("Python SSL:", ssl.OPENSSL_VERSION)
print("Certifi bundle:", certifi.where())

ctx = ssl.create_default_context(cafile=certifi.where())
print("SSL context created successfully!")