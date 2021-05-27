String s = '=1~2=3';
s = s.replaceAll('[=]','\n=');
s = s.replaceAll('[~]','\n~');
System.debug(s);
List<String> sList = s.split('\n');

System.debug(sList);