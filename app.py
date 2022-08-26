import json

import pandas as pd
import pymysql
from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def hello_world():  # put application's code here
    return 'Hello World!'


@app.route('/hello')
def hello():
    return render_template('index.html')


@app.route('/typenums', methods=['POST', 'GET'])
def typenums():
    # 打开数据库连接
    # 接收前端传来的数据
    province = request.form.get('province')
    db = pymysql.connect(host="localhost", user="root", passwd="123456", db="gaokao", charset='utf8')
    # 使用cursor()方法获取操作游标
    cursor = db.cursor()
    # SQL 查询语句
    if (province == None):
        # 全国
        sql = "SELECT type_name,count(*) count FROM school GROUP BY type_name"
    else:
        # 省份
        sql = "SELECT type_name,count(*) count FROM school where province_name='%s' GROUP BY type_name" % province
    # 利用pandas 模块导入mysql数据
    a = pd.read_sql(sql, db)
    data1 = a['type_name'].to_json(orient="values", force_ascii=False)
    data2 = a['count'].to_json(orient="values")
    data1 = json.loads(data1)
    data2 = json.loads(data2)
    data = {'type_name': data1, "count": data2}
    return data


@app.route('/level_name', methods=['POST', 'GET'])
def level_name():
    db = pymysql.connect(host="localhost", user="root", passwd="123456", db="gaokao", charset='utf8')
    cursor = db.cursor()
    province = request.form.get('province')
    if (province == None):
        # 全国
        sql = "SELECT level_name,count(*) count FROM `school` GROUP BY level_name"
    else:
        # 省份
        sql = "SELECT level_name,count(*) count FROM `school` where province_name = '%s' GROUP BY level_name" % province
    a = pd.read_sql(sql, db)
    data1 = a['level_name'].to_json(orient="values")
    data2 = a['count'].to_json(orient="values")
    data1 = json.loads(data1)
    data2 = json.loads(data2)
    data = {'level_name': data1, "count": data2}
    return data


@app.route('/school_nature_name', methods=['POST', 'GET'])
def school_nature_name():
    db = pymysql.connect(host="localhost", user="root", passwd="123456", db="gaokao", charset='utf8')
    cursor = db.cursor()
    province = request.form.get('province')
    if (province == None):
        # 全国
        sql = "SELECT school_nature_name,count(*) count FROM `school` GROUP BY school_nature_name"
    else:
        # 省份
        sql = "SELECT school_nature_name,count(*) count FROM `school` where province_name = '%s' GROUP BY school_nature_name" % province
    a = pd.read_sql(sql, db)
    data1 = a['school_nature_name'].to_json(orient="values")
    data2 = a['count'].to_json(orient="values")
    data1 = json.loads(data1)
    data2 = json.loads(data2)
    data = {'school_nature_name': data1, "count": data2}
    return data


@app.route("/f985_211", methods=['POST', 'GET'])
def f985_211():
    db = pymysql.connect(host="localhost", user="root", passwd="123456", db="gaokao", charset='utf8')
    cursor = db.cursor()
    province = request.form.get('province')
    if (province == None):
        sql1 = "select count(*) count from school where f985=1 " #985
        sql2 = "select count(*) count from school where f211=1 " #211
        sql3 = "select count(*) count from school where dual_class_name='双一流'" #双一流
    else:
        sql1 = "select count(*) count from school where f985=1 and province_name='%s'" % province
        sql2 = "select count(*) count from school where f211=1 and province_name='%s'" % province
        sql3 = "select count(*) count from school where dual_class_name='双一流' and province_name='%s'" % province
    a = pd.read_sql(sql1, db)
    b = pd.read_sql(sql2, db)
    c = pd.read_sql(sql3, db)
    data1 = a['count'].to_json(orient="values")
    data2 = b['count'].to_json(orient="values")
    data3 = c['count'].to_json(orient="values")
    data1 = json.loads(data1)
    data2 = json.loads(data2)
    data3 = json.loads(data3)
    data = {'f985': data1, "f211": data2,"dual_class_name": data3}
    return data


@app.route("/message", methods=['POST', 'GET'])
def message():
    db = pymysql.connect(host="localhost", user="root", passwd="123456", db="gaokao", charset='utf8')
    cursor = db.cursor()
    province = request.form.get('province')
    if (province == None):
        # 全国
        sql = "select name,num_master,num_doctor,num_subject,gbh_num from school where ruanke_rank!='0' order by ruanke_rank limit 10"
    else:
        # 省份
        sql = "select name,num_master,num_doctor,num_subject,gbh_num from school where ruanke_rank!='0' and province_name='%s' order by ruanke_rank" % province
    a = pd.read_sql(sql, db)
    data1 = a['name'].to_json(orient="values")
    data2 = a['num_master'].to_json(orient="values")
    data3 = a['num_doctor'].to_json(orient="values")
    data4 = a['num_subject'].to_json(orient="values")
    data5 = a['gbh_num'].to_json(orient="values")
    data1 = json.loads(data1)
    data2 = json.loads(data2)
    data3 = json.loads(data3)
    data4 = json.loads(data4)
    data5 = json.loads(data5)
    data = {'name': data1, "num_master": data2, "num_doctor": data3, "num_subject": data4, "gbh_num": data5}
    return data


@app.route("/area", methods=['POST', 'GET'])
def area():
    db = pymysql.connect(host="localhost", user="root", passwd="123456", db="gaokao", charset='utf8')
    cursor = db.cursor()
    province = request.form.get('province')
    if (province == None):
        sql = "select name,area from school where ruanke_rank!='0' ORDER BY ruanke_rank limit 10"
    else:
        sql = "select name,area from school where ruanke_rank!='0' and province_name='%s' ORDER BY ruanke_rank limit 10" % province
    a = pd.read_sql(sql, db)
    data1 = a['name'].to_json(orient="values")
    data2 = a['area'].to_json(orient="values")
    data1 = json.loads(data1)
    data2 = json.loads(data2)
    data = {'name': data1, "area": data2}
    return data


@app.route("/paiming", methods=['POST', 'GET'])
def paiming():
    db = pymysql.connect(host="localhost", user="root", passwd="123456", db="gaokao", charset='utf8')
    cursor = db.cursor()
    province = request.form.get('province')
    if (province == None):
        sql = "select name,ruanke_rank,xyh_rank,wsl_rank,qs_world,us_rank from school where ruanke_rank!='0' order by ruanke_rank limit 10"
    else:
        sql = "select name,ruanke_rank,xyh_rank,wsl_rank,qs_world,us_rank from school where ruanke_rank!='0' and province_name='%s' order by ruanke_rank" % province
    a = pd.read_sql(sql, db)
    data1 = a['name'].to_json(orient="values")
    data2 = a['ruanke_rank'].to_json(orient="values")
    data3 = a['xyh_rank'].to_json(orient="values")
    data4 = a['wsl_rank'].to_json(orient="values")
    data5 = a['qs_world'].to_json(orient="values")
    data6 = a['us_rank'].to_json(orient="values")
    data1 = json.loads(data1)
    data2 = json.loads(data2)
    data3 = json.loads(data3)
    data4 = json.loads(data4)
    data5 = json.loads(data5)
    data6 = json.loads(data6)
    data = {'name': data1, "ruanke_rank": data2, "xyh_rank": data3, "wsl_rank": data4, "qs_world": data5, "us_rank": data6}
    return data


if __name__ == '__main__':
    app.config['JSON_AS_ASCII'] = False
    app.run()
