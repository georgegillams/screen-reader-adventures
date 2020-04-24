# #!/bin/bash

# . ./config/aws/0_git_clone.sh # By definition this is done if we have the script
. ./config/aws/1_install.sh
. ./config/aws/2_configure_nginx.sh
. ./config/aws/3_configure_redis.sh
. ./config/aws/4_build_project.sh
. ./config/aws/5_setup_pm2.sh
. ./config/aws/6_setup_ssl.sh
. ./config/aws/7_configure_cron.sh
