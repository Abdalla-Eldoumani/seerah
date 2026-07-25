const fs=require('fs');
const W=/\b(the|The|you|You|your|Your|and|and|with|from|that|this|when|what|which|have|has|are|is|of|to|for|not|does|will|would|should|can|prayer|Prayer|Learn|Loading|Search|Error|Try|again|Start|Continue|Next|Previous|Back|Home|Settings|Close|Open|Copy|Share|Save|Reset|About|More|Show|Hide|Select|Enter|Please|No |Yes|Complete|Completed|Step|Steps|Progress|Menu|Language|Found|Failed|Unable|Retry|Allow|Enable|Toggle|Play|Pause|Sound|Volume|minutes|min read|lesson|Lesson|module|Module)\b/;
for(const f of fs.readdirSync('.').filter(x=>x.endsWith('.html'))){
  let h=fs.readFileSync(f,'utf8');
  let b=h.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'').replace(/<head[\s\S]*?<\/head>/i,'');
  b=b.replace(/<[^>]+>/g,'\n').replace(/&#x27;/g,"'").replace(/&amp;/g,'&').replace(/&quot;/g,'"');
  const lines=[...new Set(b.split('\n').map(s=>s.trim()).filter(Boolean))];
  const hits=lines.filter(l=>W.test(l) && !/^(English|Français|Fajr|Dhuhr|Maghrib|Pause)$/.test(l));
  if(hits.length){console.log('### '+f);hits.forEach(l=>console.log('   '+l.slice(0,180)));}
}
