#!/bin/bash

DATA="data"
DUMP="dump"

if [ "$#" -eq 0 ] || [ $1 = "-h" ] || [ $1 = "--help" ]; then
    echo "Usage: ./mongo.bash [OPTIONS] COMMAND [arg...]"
    echo "       ./mongo.bash [ -h | --help ]"
    echo ""
    echo "Options:"
    echo "  -h, --help    Prints usage."
    echo ""
    echo "Commands:"
    echo "  $DATA      - Create mongo local user and restore data from a dump."
    echo "  $DUMP      - Download dump to be restored"
    exit
fi

dump () {
    echo "Dumping..."
    mongodump --uri mongodb+srv://$MONGODUMP_USER:$MONGODUMP_PASSWORD@$MONGODUMP_URL/$MONGODUMP_DB?retryWrites=true&w=majority
    echo "Finished dumping"
}

restore () {
    echo "Restoring..."
    mongorestore --drop
    echo "Finished restoring"
}

if [ $1 = $DATA ]; then
    restore
	exit
fi

if [ $1 = $DUMP ]; then
	dump
	exit
fi
