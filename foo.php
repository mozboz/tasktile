<?php
$p = file('http://quiz.gambitresearch.com/');

print_r($p[22]);

$matches = array();
preg_match('/\{([0-9 \+\*\-]+)\}/', $p[22], $matches);
print_r($matches);

eval('$a=' . $matches[1].';');
echo "a: ".$a;
$foo=file_get_contents('http://quiz.gambitresearch.com/job/'.$a);
echo "foo: ".$foo
?>
