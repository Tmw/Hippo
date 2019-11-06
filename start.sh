# Run the migrations (if any) on startup
/opt/app/bin/hippo eval "Hippo.Release.migrate"

# Then start the app
trap 'exit' INT; /opt/app/bin/hippo start
