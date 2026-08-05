# Raw HTTP/HTTPS Server

## Запуск HTTP-сервера

```bash
node src/server.js
```

HTTP-сервер працює на порту `3000`.

## Запуск HTTPS-сервера

```bash
node src/https-server.js
```

HTTPS-сервер працює на порту `3443`.

## Генерація self-signed сертифіката

Для Git Bash на Windows:

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout certs/server-key.pem -out certs/server-cert.pem -days 365 -subj "//CN=localhost"
```

## Debug-сесія

```bash
openssl s_client -connect localhost:3443 -servername localhost
```

```text
Connecting to ::1
CONNECTED(000001F4)
depth=0 CN=localhost
verify error:num=18:self-signed certificate
verify return:1
depth=0 CN=localhost
verify return:1
---
Certificate chain
 0 s:CN=localhost
   i:CN=localhost
   a:PKEY: rsaEncryption, 2048 (bit); sigalg: RSA-SHA256
---
subject=CN=localhost
issuer=CN=localhost
---
Verification error: self-signed certificate
---
New, TLSv1.3, Cipher is TLS_AES_256_GCM_SHA384
Server public key is 2048 bit
Verify return code: 18 (self-signed certificate)
```

Код помилки `18` означає, що сертифікат є самопідписаним.
