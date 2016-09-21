FROM ubuntu:14.04
MAINTAINER Osamu Kashimura <osamu.kashimura.17@gmail.com>

RUN apt-get clean && \
    apt-get update && \
    apt-get install -y software-properties-common && \
    locale-gen en_US.UTF-8 && export LANG=C.UTF-8 && \
    add-apt-repository ppa:ondrej/php5-5.6 && \
    apt-get update && \
    apt-get install -y php5 php5-dev php-pear php5-mysql && \
    apt-get install -y php5-gd php5-curl php5-xdebug git && \
    apt-get install -y nginx && \
    apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0x5a16e7281be7a449 && \
    add-apt-repository "deb http://dl.hhvm.com/ubuntu $(lsb_release -sc) main" && \
    apt-get update && \
    apt-get install -y hhvm


ADD docker/data/php.ini /etc/hhvm/php.ini
ADD docker/data/start.sh /etc/start.sh
RUN chmod 755 /etc/start.sh

CMD ["/etc/start.sh"]

