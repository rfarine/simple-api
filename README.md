# simple-api

## To get up and running:

Run `docker-compose up -d`

In a separate terminal window, run `docker-compose logs --follow` to watch the logs.

## Images to use

I have included some cat images in `to_upload` (all jpgs) to use for uploading.

## To check files saved to disk

1. Run `docker-compose exec simple-api sh`
2. `cd uploads`
3. `ls`

## Commands

**Note:** To see available command line options, you can run `docker-compose exec simple-api node callApi.js --help`

### Create

Run: `docker-compose exec simple-api node callApi.js --create to_upload/file`

### Read

Run: `docker-compose exec simple-api node callApi.js --read --id "[id here]"`

### Update

Run: `docker-compose exec simple-api node callApi.js --update to_upload/file --id "[id here]"`

### Delete

Run: `docker-compose exec simple-api node callApi.js --delete --id "[id here]"`

### List All

Run: `docker-compose exec simple-api node callApi.js --all`
