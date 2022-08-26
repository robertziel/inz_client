domain = 'x'
backend_api_url = 'x'

set :stage, :production

set :full_app_name, "#{fetch(:application)}_#{fetch(:stage)}"

set :deploy_to, "/usr/home/robertz/domains/#{domain}"

server 's13.mydevil.net', user: 'robertz', roles: %w{web app db}, primary: true

set :branch, :master
# Simple Role Syntax
# ==================
# Supports bulk-adding hosts to roles, the primary
# server in each group is considered to be the first
# unless any hosts have the primary property set.

set :domain, domain # required for automatic app restarts

# MyDevil.net custom operations
namespace :deploy do
  # link app to location required by mydevil.net
  after :published, :symlink_to_public_ruby do

    on roles(:web), in: :groups, limit: 3, wait: 10 do
      execute "npm -v; node -v"

      system('mv .env .env.prod')
      system("echo \"BACKEND_API_URL=#{backend_api_url}\" >> .env")
      system('npm run-script build')
      # system('mv build/sw.js build/sw.js.wait')
      # system('gzip -f build/*.js && gzip -f build/*.woff && gzip -f build/*.woff2')
      # system('mv build/sw.js.wait build/sw.js')
      system('mv .env.prod .env')

      upload!("build", "#{fetch(:release_path)}/build", recursive: true)
      # execute "(export C=clang; export CXX=clang++; export CC=gcc48; export CXX=g++48; cd #{fetch(:release_path)}; npm8 install)"
      execute "rm -r #{fetch(:deploy_to)}/public_nodejs"
      execute "ln -s #{fetch(:release_path)} #{fetch(:deploy_to)}/public_nodejs"
      # execute "(cd #{fetch(:deploy_to)}/public_nodejs; npm8 run-script build)"
    end
  end
  # automatically restart app after deploy
  after :published, :restart_app do
    on roles(:app), in: :groups, limit: 3, wait: 10 do
      execute "devil www restart #{domain}"
    end
  end
end

=begin
ssh robertz@s13.mydevil.net
cd domains/simple-panel-react-client.robertz.co/public_nodejs
npm install
npm install rimraf
npm install cross-env
npm run-script build
devil www restart simple-panel-react-client.robertz.co
=end
