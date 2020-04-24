# #!/bin/bash

/usr/bin/certbot-auto renew --no-self-upgrade --renew-hook "service nginx restart"
