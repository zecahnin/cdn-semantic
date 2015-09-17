# cdn-semantic
CND with semantic-ui jquery jquery-ui components-font-awesome highcharts minify leaflet concat uglify        

==============

### Dependências

1. NodeJs: versao = node-v0.12.7 https://nodejs.org/dist/v0.12.7/node-v0.12.7.tar.gz
2. Gulp: versao => 3.9.0
3. Bower: versao >- 1.5
4. Apache 2.4

### Instalação

1. Faça o clone deste projeto
2. Configurar o arquivo package.json e alterar "cdnHost": "http://cdn.localhost"
3. Entre na pasta do projeto e rode bin/update


### VirualHost Apache
<VirtualHost *:80>
   DocumentRoot "$_CDNFOLDER/public"
   ServerName cdn.localhost
   ErrorLog ${APACHE_LOG_DIR}/cdn_ipla_error.log
   # This should be omitted in the production environment
   Header set Access-Control-Allow-Origin "*"
   <Directory "$_CDNFOLDER/public">
        Options +Indexes
        Require all granted
        AllowOverride All
   </Directory>
   <Files *.ini>
        Require all granted
   </Files>
</VirtualHost>

### hosts
127.0.0.1       cdn.localhost


### Testando a aplicação

1. Adicionar o js e css
<link rel="stylesheet" type="text/css" href="http://cdn.localhost/vendor/css/cnd.min.css">
<script src="http://cdn.localhost/vendor/js/cnd.min.js"></script>

### Screenshot
