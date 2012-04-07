all: requirejs q
	@@echo "Build complete:" `date`

requirejs:
	@@wget http://requirejs.org/docs/release/1.0.7/minified/require.js \
		-P vendor

q:
	@@wget https://raw.github.com/kriskowal/q/v0.8.2/q.min.js \
		-P vendor

clean:
	@@rm -r vendor/*
