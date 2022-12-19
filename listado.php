<?php
echo "<h1>LISTADO</h1>";
echo "<ol>";
for ($i=$_GET['ini']; $i <= $_GET['fin']; $i++) { 
  echo "<li>Elemento $i</li>";
}
echo "</ol>";