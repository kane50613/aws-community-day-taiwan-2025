#!/bin/bash
# Define a function to handle the keyboard interrupt signal
function handle_interrupt {
    echo "^C received. Exiting..."
    exit 1
}
# Trap the keyboard interrupt signal and associate it with the handle_interrupt function
trap handle_interrupt SIGINT
# real codes
echo "Syncing with s3..."
aws s3 sync build/client/ s3://awscmd.tw-migration/
echo "Updating locales..."
aws s3 cp s3://awscmd.tw-migration/ja/index.html s3://awscmd.tw-migration/ja --content-type "text/html" --metadata-directive "REPLACE"
aws s3 rm s3://awscmd.tw-migration/ja/index.html
aws s3 cp s3://awscmd.tw-migration/en/index.html s3://awscmd.tw-migration/en --content-type "text/html" --metadata-directive "REPLACE"
aws s3 rm s3://awscmd.tw-migration/en/index.html
aws s3 cp s3://awscmd.tw-migration/kr/index.html s3://awscmd.tw-migration/kr --content-type "text/html" --metadata-directive "REPLACE"
aws s3 rm s3://awscmd.tw-migration/kr/index.html
echo "Invalidating CloudFront..."
aws cloudfront create-invalidation --distribution-id E2FYOFED7YP5FT --paths "/" "/en" "/ja" "/kr"
echo "Done."