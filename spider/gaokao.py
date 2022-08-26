import requests
import json
import pymysql
from bs4 import BeautifulSoup

def get_html(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.149 Safari/537.36'
    }
    html = requests.get(url, headers=headers)
    return html

def get_db():
    conn = pymysql.connect(host='localhost', user='root', password='123456', db='gaokao', charset='utf8')
    return conn


def get_school_id():
    # 爬取 www.gaokao.cn
    url = 'https://static-data.gaokao.cn/www/2.0/school/name.json'
    html = get_html(url)
    html = html.text
    html = json.loads(html)
    data = html['data']
    for i in data:
        school_id = i['school_id']
        name = i['name']
        con = get_db()
        cursor = con.cursor()
        sql = "insert into school(school_id, name) values('%s', '%s')" % (school_id, name)
        cursor.execute(sql)
        con.commit()

def get_province_id():
    url = "https://static-data.gaokao.cn/www/2.0/schoolprovinceindex/2022/132/36/1/1.json"
    html = get_html(url)
    html = html.text
    html = json.loads(html)
    print(html)

def get_school_info():
    url = "https://static-data.gaokao.cn/www/2.0/school/%s/info.json"
    con = get_db()
    cursor = con.cursor()
    sql = "select school_id from school"
    cursor.execute(sql)
    data = cursor.fetchall()
    print(data)
    for i in data:
        school_id = i[0]
        html = get_html(url % school_id)
        html = html.text
        html = json.loads(html)
        data = html['data']
        belong = data['belong']
        num_library = data['num_library']
        num_lab = data['num_lab']
        province_id = data['province_id']
        create_date = data['create_date']
        area = data['area']
        old_name = data['old_name']
        level_name = data['level_name']
        type_name = data['type_name']
        school_type_name = data['school_type_name']
        school_nature_name = data['school_nature_name']
        dual_class_name = data['dual_class_name']
        xueke_rank = str(data['xueke_rank']).replace('\'', '')
        province_name = data['province_name']
        city_name = data['city_name']
        town_name = data['town_name']
        email = data['email']
        address = data['address']
        postcode = data['postcode']
        site = data['site']
        phone = data['phone']
        school_phone = data['school_phone']
        content = data['content']
        rank = str(data['rank'])
        ruanke_rank = str(data['ruanke_rank'])
        xyh_rank = str(data['xyh_rank'])
        wsl_rank = str(data['wsl_rank'])
        qs_rank = str(data['qs_rank'])
        us_rank = str(data['us_rank'])
        num_master = data['num_master']
        num_doctor = data['num_doctor']
        num_subject = data['num_subject']
        gbh_num = data['gbh_num']
        # sql = "update school set belong='%s', num_library='%s', num_lab='%s', province_id='%s', create_date='%s', area='%s', old_name='%s', level_name='%s', type_name='%s', school_type_name='%s', school_nature_name='%s', dual_class_name='%s', xueke_rank='%s', province_name='%s', city_name='%s', town_name='%s', email='%s', address='%s', postcode='%s', site='%s', phone='%s', school_phone='%s', content='%s',  num_master='%s', num_doctor='%s', num_subject='%s', gbh_num='%s',ruanke_rank='%s',xyh_rank='%s',wsl_rank='%s',qs_world='%s',us_rank='%s' where school_id='%s'" % (belong, num_library, num_lab, province_id, create_date, area, old_name, level_name, type_name, school_type_name, school_nature_name, dual_class_name, xueke_rank, province_name, city_name, town_name, email, address, postcode, site, phone, school_phone, content,  num_master, num_doctor, num_subject, gbh_num,ruanke_rank,xyh_rank,wsl_rank,qs_rank,us_rank, school_id)
        # cursor.execute(sql)
        # con.commit()
        print(school_id,data['name'],belong,num_library,num_lab,province_id,create_date,area,old_name,level_name,type_name,school_type_name,school_nature_name,dual_class_name,xueke_rank,province_name,city_name,town_name,email,address)

def get_school_info_f():
    url = "https://static-data.gaokao.cn/www/2.0/school/%s/info.json"
    con = get_db()
    cursor = con.cursor()
    sql = "select school_id from school"
    cursor.execute(sql)
    data = cursor.fetchall()
    print(data)
    for i in data:
        school_id = i[0]
        html = get_html(url % school_id)
        html = html.text
        html = json.loads(html)
        data = html['data']
        f985 = data['f985']
        f211 = data['f211']
        sql = "update school set f985='%s', f211='%s' where school_id='%s'" % (f985, f211, school_id)
        cursor.execute(sql)
        con.commit()
        print(school_id,data['name'])

def get_dic_school_rank():
    # url = "https://static-data.gaokao.cn/www/2.0/schoolrank/dicSchoolRank.json"
    # url = "https://static-gkcx.gaokao.cn/www/2.0/json/rank/10240/36/lists.json"
    url = "https://static-data.gaokao.cn/www/2.0/schoolrank/us_rank.json"
    html = get_html(url)
    html = html.text
    html = json.loads(html)
    data = html['data']
    for i in data:
        school_id = i['school_id']
        province_name = i['province_name']
        type_name = i['type_name']
        name = i['name']
        rank = i['rank']
        sort = i['sort']
        con = get_db()
        cursor = con.cursor()
        sql = "insert into us_rank(school_id, province_name, type_name, name, `rank`, sort) values('%s', '%s', '%s', '%s', '%s', '%s')" % (school_id, province_name, type_name, name, rank, sort)
        cursor.execute(sql)
        con.commit()
        print(school_id, name)

def get_province_line():
    url = "https://static-data.gaokao.cn/www/2.0/schoolprovinceindex/2022/%s/%s/1/1.json"
    con = get_db()
    cursor = con.cursor()
    sql = "select school_id from school"
    cursor.execute(sql)
    data = cursor.fetchall()
    sql1 = "select province_id from province"
    cursor.execute(sql1)
    data1 = cursor.fetchall()
    for j in data1:
        for i in data:
            school_id = i[0]
            province_id = j[0]
            html = get_html(url % (school_id,province_id))
            print(url % (school_id,province_id))
            html = html.text
            html = json.loads(html)
            if html == "":
                continue
            data = html['data']
            item = data['item']
            for k in item:
                school_id = k['school_id']
                province_id = k['province_id']
                year = k['year']
                local_batch_name = k['local_batch_name']
                zslx_name = k['zslx_name']
                min = k['min']
                min_section = k['min_section']
                proscore = k['proscore']
                sql = "insert into province_line(school_id, province_id, year, local_batch_name, zslx_name, min, min_section, proscore) values('%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s')" % (school_id, province_id, year, local_batch_name, zslx_name, min, min_section, proscore)
                cursor.execute(sql)
                con.commit()
                print(school_id, province_id, year, local_batch_name, zslx_name, min, min_section, proscore)



def get_jobdetail():
    url = "https://static-data.gaokao.cn/www/2.0/school/%s/pc_jobdetail.json"
    con = get_db()
    cursor = con.cursor()
    sql = "select school_id from school"
    cursor.execute(sql)
    data = cursor.fetchall()
    for i in data:
        school_id = i[0]
        html = get_html(url % school_id)
        html = html.text
        html = json.loads(html)
        if html == "":
            continue
        data = html['data']
        jobrate = data['jobrate']
        gradute = data['gradute']
        if(gradute == ""):
            female_num = ""
            men_num = ""
            men_rate = ""
            female_rate = ""
        else:
            female_num = gradute[0]['female_num']
            men_num = gradute[0]['men_num']
            men_rate = gradute[0]['men_rate']
            female_rate = gradute[0]['female_rate']
        if jobrate == "":
            job = ""
            postgraduate = ""
            abroad = ""
        else:
            job = jobrate['job']['1']
            postgraduate = jobrate['postgraduate']['1']
            abroad = jobrate['abroad']['1']
        sql = "update school set job='%s', postgraduate='%s', abroad='%s',female_num='%s',men_num='%s',men_rate='%s',female_rate='%s' where school_id='%s'" % (job, postgraduate, abroad,female_num,men_num,men_rate,female_rate,school_id)
        cursor.execute(sql)
        con.commit()
        print(school_id, job, postgraduate, abroad,female_num,men_num)




if __name__ == '__main__':
    # get_school_id()
    get_school_info()
    # get_province_id()
    # get_dic_school_rank()
    # get_province_line()
    # get_jobdetail()
