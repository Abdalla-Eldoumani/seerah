import io,sys,glob,re,os,html
sys.stdout=io.TextIOWrapper(sys.stdout.buffer,encoding='utf-8',errors='replace')
rows={}
for p in sorted(glob.glob('ng/*.html')):
    s=open(p,encoding='utf-8').read()
    m=re.search(r'<title>(.*?)</title>',s,re.S)
    d=re.search(r'<meta name="description" content="(.*?)"',s,re.S)
    b=os.path.basename(p)[:-5]
    loc,route=b.split('-',1)
    rows.setdefault(route,{})[loc]=(html.unescape(m.group(1)) if m else None, html.unescape(d.group(1))[:90] if d else None)
for r in rows:
    print('##',r)
    for l in ('en','ar','fr'):
        v=rows[r].get(l)
        print('  ',l,v)
