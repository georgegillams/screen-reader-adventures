pm2 start ./config/aws/start_aws.sh --name "screen-reader-adventures"
pm2 startup | grep sudo | bash
pm2 save
