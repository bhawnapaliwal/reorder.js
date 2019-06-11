import re
import json
f= open("distance.txt","r")//distance.txt sample file containing matrix in specified format as given in sample.txt
f1 = f.readlines()
nodes_l1=[]
links_l=[]
for i in range(0,250)://replace 250 with the size of your matrix or use the below commented code to find size of matrix
    nodes_l={}
    nodes_l['name']=str(i)
    nodes_l1.append(nodes_l)
#size=0
#for line in f1:
#    print(line)
#    l1 = re.findall("\d+",line)
#    l1[0]=int(l1[0])
#    l1[1]=int(l1[1])
#    if l1[0]>size:
#        size=l1[0]
datal1=[]
for l in f1:
    l1 = re.findall("\d+",l)
    l1[0]=int(l1[0])-1
    l1[1]=int(l1[1])-1
    l2 = re.findall("\d+\.\d+",l)
    data = {}
    data['source'] = int(l1[0])
    data['target'] = int(l1[1])
    data['value'] = float(l2[0])
    datal1.append(data)
json_data_final={}
json_data_final['nodes']=nodes_l1
json_data_final['links']=datal1
json_data_final=json.dumps(json_data_final)
f1 = open("new1_a.json","w+")
f1.write(json_data_final)
