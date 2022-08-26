set :application, 'robertz_co'
set :repo_url, 'git@github.com:robertziel/inz_client.git'

set :scm, :git

set :format, :pretty

set :linked_files, fetch(:linked_files, []).concat(%w('app.js'))
set :linked_files, fetch(:linked_files, []).concat(%w('.env'))
# set :linked_dirs, fetch(:linked_dirs, []).concat(%w(node_modules))

set :keep_releases, 5

namespace :deploy do

  after :finishing, 'deploy:cleanup'

end
