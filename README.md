# Setup
You'll need nodejs and ruby (for Compass, Scss):
     
```sh
gem install bundler                # http://gembundler.com/
bundle install                     # Dev dependencies in Gemfile
npm install                        # Dev dependencies in package.json
```
  

# Compile
Watch for changes, compile Javascript and SCSS, and run server
  
```sh
grunt
```

Compile all, minify don't start server

```sh
grunt all
```
