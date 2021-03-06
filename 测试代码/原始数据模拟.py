#!/usr/bin/python
#-*-coding:utf-8-*-
#@author:Pengyue Zhao


import json,datetime
import sys
from  random import randrange as rg
from random import uniform as uf
from  dateutil import relativedelta
import elasticsearch
import time as te
import requests
from elasticsearch import helpers

form = '{"addr": "\\u5409\\u6797", "lon": 0, "wmac": "02:1a:11:fb:d7:a7", "rate": "3", "port": 9100, "host": "192.168.1.10", "data":[ {"rssi": "-55", "mac": "", "range": "4.2"}], "time": "", "lat": 0, "mmac": "a2:20:a6:15:0c:c4", "wssid": "soft", "id": ""}'


#es = elasticsearch.Elasticsearch([{'host':'192.168.1.50','port':'9200'},{'host':'192.168.1.52','port':'9200'}],sniff_on_start=True,sniff_on_connection_fail=True,sniffer_timeout=60,request_timeout=1000)
data = json.loads(form)
start_time = datetime.datetime(2017,7,20,12,00,00)	
start_times = start_time.strftime('%a %b %d %H:%M:%S %Y')	

end_times = start_time + relativedelta.relativedelta(months=1,days=20)
now_time = datetime.datetime.now()
time_mac = {}	
start_id = '1'	
data.update({'id':start_id,'time':start_times})

data_s = []

def jindu(count,p):		
	width = 50
	parsent = int(round(float(p)/float(count),2)*100)
	sys.stdout.write('{p}/{count}:'.format(p = p,count = count))
	sys.stdout.write('[' + parsent/2 * '*' + '-' * (width-parsent/2) + ']' + ':'+'{p}/{count}'.format(p = parsent,count=100)+'\r')
	sys.stdout.flush()



def mkjson():


	global now_time
	global data
	global time_mac
	global start_id
	global data_s
	
	temp = {}
	stime = datetime.datetime.strptime(data['time'],'%a %b %d %H:%M:%S %Y')	
	time = stime + datetime.timedelta(seconds = 60)
	now_time = time
	etime = time.strftime('%a %b %d %H:%M:%S %Y')
	hour = time.hour
	mac_count = 0					
	mac_incount = len(time_mac.keys())		
	mac_outcount = 0				
	mac_list = []				
	mac0 = '00:00:00:00'
	mac1 = 0
	mac2 = 0
	mac_tmp = mac_incount
	if hour >= 6 and hour <= 18:
		mac_count = rg(20,30)
		mac_tmp = rg(8,12)			
	elif hour > 18 and hour <=24:
		mac_count = rg(18,28)
		mac_tmp = rg(6,10)
	elif hour >= 0 and hour < 6:
		mac_count = rg(12,24)
		mac_tmp = rg(4,8)
	if len(time_mac.keys())	!= 0:
		for x in time_mac.keys():	
			if (time_mac[x] - time).total_seconds() <= 0: 
				time_mac.pop(x)
				mac_incount-=1
			else:				
				s = {}
				s['range'] = rg(30)
				s['mac'] = x
				s['rssi'] = '-'+str(rg(40,100))
				mac_list.append(s)
	mac_outcount = mac_count - mac_incount
	if mac_tmp - mac_incount > 4:			
		for x in range(rg(mac_tmp-mac_incount)): 
			mac = ''
			while True:
				mac1 = str(rg(99)).zfill(2)
				mac2 = str(rg(99)).zfill(2)
				mac = mac0+':'+mac1+':'+mac2
				if mac not in time_mac:
					break
			t = rg(3,20)		
			time_mac[mac] = time+datetime.timedelta(minutes = t) 
			s = {}	
			s['mac'] = mac
			s['range'] = rg(30)
			s['rssi'] = '-'+str(rg(40,100))
			mac_list.append(s)
	else:
		mac_tmp = mac_incount
	mac_outcount = mac_count - mac_tmp
	for x in range(mac_outcount):		
		mac = ''
		while True:
			mac1 = str(rg(99)).zfill(2)
			mac2 = str(rg(99)).zfill(2)
			mac = mac0+':'+mac1+':'+mac2
			if mac not in time_mac:
				break
		s = {}	
		s['mac'] = mac
		s['range'] =rg(30,100)
		s['rssi'] = '-'+str(rg(40,100))
		mac_list.append(s)


	temp['time'] = etime
	temp['data'] = mac_list[:]
	temp['lat'] = str(round(uf(125.293995,125.300265),6))	
	temp['lon'] = str(round(uf(43.860149,43.860461),6))	
	temp['location'] = [temp['lon'],temp['lat']]
	time = datetime.datetime.strptime(temp['time'],'%a %b %d %H:%M:%S %Y')
        temp['@timestamp'] = time.strftime('%Y-%m-%dT%H:%M:%S.000Z')          
        index = 'sou'
        doc_type = 'tz_{number}'.format(number=start_id)
	_id = time.strftime('%a %b %d %H:%M:%S %Y')
	dic = {'_id':_id,'_index':index,'_type':doc_type,'_source':temp}
	data_s.append(dic)
	data = temp
#	if not es.indices.exists(index=index):
#		es.indices.create(index = index)
		
	
x = (end_times - start_time).total_seconds()

def write_file(s):
	if len(s):
		with open('sou.txt','a+') as f:
			f.write(json.dumps(s[0]['_source'])+'\n')
while True:
	global now_time
	global data_s
	global es
#	end_time = datetime.datetime.now()
	i = (end_times-now_time).total_seconds()
	if i > 0:
		jindu(x,x-i+1)
		mkjson()
		write_file(data_s)
		data_s = []
#		if len(data_s) >= 300:
#			helpers.bulk(es,data_s,request_timeout=6000)
#			data_s = []
#			te.sleep(0.5)
	else:
		break
	


