<form method='GET' action='http://wikibox.softbox.com.br:8080/gerarseed'>
Usuario Banco: <input name='userbanco' type='text' value=''/>
</br></br>


Senha Banco: <input name='senhabanco' type='text' value=''/>
</br></br>


Url Banco<input name='urlbanco' type='text' value=''/>
</br></br>


Porta Banco<input name='portabanco' type='text' value=''/>
</br></br>


Ip Server<input name='ipservidor' type='text' value='localhost'/>
</br></br>


Porta HTTP<input name='porta' type='text' value='8080'/>
</br></br>


Template:<select name='template'>
    <option selected value='ssh://git@gitlab.softbox.com.br:1912/metodologia/jee-vue-seed.git'>Java + Vue.js</option>
  </select>
</br></br>

Servidor:<select name='template'>
    <option selected value='wildfly'>Wildfly</option>
  </select>
</br></br>


Server User<input name='userwildfly' type='text' value='admin'/>
</br></br>


Server Password<input name='senhawildfly' type='text' value='adminpass'/>
</br></br>


Porta Management<input name='portamanagement' type='text' value='9990'/>
</br></br>


<input type='submit' value='Gerar Seed'></button>
</form>