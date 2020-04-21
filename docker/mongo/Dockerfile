FROM mongo
WORKDIR /home/normalization
COPY bash/mongo.bash ./
RUN chmod 700 mongo.bash
EXPOSE 27017
CMD ["mongod"]