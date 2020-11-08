FROM jaspeen/oracle-xe-11g

# 이미지 환경변수들 세팅
ENV SQL_DIRECTORY /dbscripts 

# 도커환경에서 컨테이너 생성시 스크립트를 실행하는 폴더로
# 미리 작성된 스크립트들을 이동

COPY ./scripts/ $SQL_DIRECTORY/

# CMD sh /docker-entrypoint-initdb/init.sh