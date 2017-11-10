# The standard nginx container just runs nginx. The configuration file added
# below will be used by nginx.
FROM nginx

# Copy the nginx configuration file. This sets up the behavior of nginx, most
# importantly, it ensure nginx listens on port 8080. Google App Engine expects
# the runtime to respond to HTTP requests at port 8080.
COPY conf/nginx.conf /etc/nginx/nginx.conf

# create log dir configured in nginx.conf
RUN mkdir -p /var/log/app_engine

# Create a simple file to handle heath checks. Health checking can be disabled
# in app.yaml, but is highly recommended. Google App Engine will send an HTTP
# request to /_ah/health and any 2xx or 404 response is considered healthy.
# Because 404 responses are considered healthy, this could actually be left
# out as nginx will return 404 if the file isn't found. However, it is better
# to be explicit.
RUN mkdir -p /usr/share/nginx/www/_ah && \
    echo "healthy" > /usr/share/nginx/www/_ah/health

# criando pastas necessárias para o gdoks
RUN mkdir /usr/share/nginx/includes && \
	mkdir /usr/share/nginx/client_data

# Finally, all static assets.	
ADD www/ /usr/share/nginx/www/
ADD includes/ /usr/share/nginx/includes/
ADD client_data/ /usr/share/nginx/client_data/

# Dando permissão de leitura nas pastas
RUN chmod -R a+r /usr/share/nginx/www && \
	chmod -R a+r /usr/share/nginx/includes && \
	chmod -R a+r /usr/share/nginx/client_data

# Install PHP
RUN	apt-get update && \
	apt-get install -y \
		php7.0-fpm \
		php7.0-cgi \
		php7.0-mysql \
	    php7.0-mcrypt \
	    php7.0-cli \
	    php7.0-json \
	    php7.0-mbstring \
	    php7.0-zip

# Cleanup
RUN apt-get autoremove -y && \
	apt-get clean && \
	apt-get autoclean

#Copiando o php.ini
COPY conf/php.ini /etc/php/7.0/fpm/php.ini

# Criando o arquivo de credenciais
RUN mkdir -p /root/.credentials
COPY conf/gdoks-6e1a2cd4a4e4.json /root/.credentials/credentials.json

#Instalando wget e o google sql cloud proxy
RUN apt-get install -y wget

#Instalando o cloud sql proxy
RUN mkdir /opt/cloudsql && \
	wget https://dl.google.com/cloudsql/cloud_sql_proxy.linux.amd64 -O /opt/cloudsql/cloud_sql_proxy && \
	chmod +x /opt/cloudsql/cloud_sql_proxy

#Installing init.d script for automatic startup
COPY cloudsql-service/etc/init.d/cloudsql /etc/init.d/cloudsql
RUN mkdir -p /etc/cloudsql/

# Copiando arquivo de configuração co cloud sql proxy
COPY cloudsql-service/etc/cloudsql/cloudsql.conf /etc/cloudsql/cloudsql.conf

# Criando pastas que vão conter o socket
RUN mkdir /cloudsql_socket && chmod 777 /cloudsql_socket
RUN mkdir /localsql_socket && chmod 777 /localsql_socket

# Atualizando não sei o que
RUN update-rc.d cloudsql defaults

#Iniciando o serviços php, nginx
CMD service cloudsql start && service php7.0-fpm start && nginx -g "daemon off;"