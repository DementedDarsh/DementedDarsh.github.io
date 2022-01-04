function startGame() {
    let x = document.querySelector(".ingame");
      x.style.display = "block";
    let y = document.querySelector(".ingame2");
      y.style.display = "block";
    let z = document.querySelector(".startgame");
      z.style.display = "none";
    randomWeapon()
  } 

  class Weapon {
    constructor(name, tooltip, icon, attack, attackSpeed, critRate, hitRate) {
      this.name = name;
      this.tooltip = tooltip;
      this.icon = icon;
      this.attack = attack;
      this.attackSpeed = attackSpeed;
      this.critRate = critRate;
      this.hitRate = hitRate;
    }
  }
  
  const WeaponList = [
    new Weapon("Attack Elephant", "Your weapon is currently a large angry elephant. It has a very low chance of hitting, but deals massive damage when it does.", "elephant.png", 50, 1, 0.25, 0.1),
    new Weapon("Normal Regular Sword", "A really generic sword that is typically seen in generic fantasy settings, no notable attributes.", "two-handed-sword.png", 20, 1, 0.25, 1),
    new Weapon("Homing Dove", "A homing dove, that always hits your target's weak point. No relation to homing pigeons.", "dove.png", 10, 1, 1, 1),
    new Weapon("Knife and Fork", "A pair of kitchen utensils, that don't do much damage, but each utensil hits once for most attacks.", "knife-fork.png", 10, 2, 0.25, 1),
    new Weapon("Ugly Spectacles", "A really unfashionable pair of eyeglasses.", "spectacle-lenses.png", 0, 1, 0, 0),
  ]

let currentWeapon = WeaponList[Math.floor(Math.random() * WeaponList.length)];


const randomWeapon = () => {
    let random = Math.floor(Math.random() * WeaponList.length);
    currentWeapon = WeaponList[random];
    document.querySelector("#weapon").src = WeaponList[random]["icon"];
    document.querySelector("#weaponName").innerText = WeaponList[random]["name"];
    document.querySelector("#weapontooltiptext").innerText = WeaponList[random]["tooltip"];
    return currentWeapon;
}

const player = {
  hp: 100,
  currentHp: 100,
  display: document.querySelector("#playerHP"),
  displayValue: document.querySelector("#playerHPNumber"),
}

const monster = {
    hp: 250,
    currentHp: 250,
    display: document.querySelector("#monsterHP"),
    displayValue: document.querySelector("#monsterHPNumber"),
}

const renderMonsterHP = () => {
    monster.display.style.width = `${monster.currentHp*100 / monster.hp}%`;
    monster.displayValue.innerText = `${monster.currentHp}`+"/"+ `${monster.hp}`

}

let combatLog = document.querySelector("#mainNav")

const renderCombatHitDamage = (damage) => {
  let log = document.createElement("DIV"); 
  let enemyDamageTakenText = document.createTextNode("Attack hit! Enemy took " + damage + " damage!");
  log.appendChild(enemyDamageTakenText);
  combatLog.appendChild(log);   
}

const renderCombatHitMiss = () => {
  let log = document.createElement("DIV"); 
  let enemyDamageTakenText = document.createTextNode("Attack missed!");
  log.appendChild(enemyDamageTakenText);
  combatLog.appendChild(log);   
}

const renderCombatHitCrit = (damage) => {
  let log = document.createElement("DIV"); 
  let enemyDamageTakenText = document.createTextNode("Critical hit! Enemy took " + damage + " damage!");
  log.appendChild(enemyDamageTakenText);
  combatLog.appendChild(log);   
}

const renderGlassesUseless = () => {
  let log = document.createElement("DIV"); 
  let enemyDamageTakenText = document.createTextNode("The glasses! They do nothing!");
  log.appendChild(enemyDamageTakenText);
  combatLog.appendChild(log);  
}

const renderGlassesUseful = () => {
  let damage = 100
  if (monster.currentHp >= damage){
  monster.currentHp = monster.currentHp - damage;}
  else
  {monster.currentHp = 0;
  winTheGame()}
  let log = document.createElement("DIV"); 
  let enemyDamageTakenText = document.createTextNode("You cry pitifully, the tears flow onto the glasses and laserbeams start firing at the enemy, dealing 100 damage!");
  log.appendChild(enemyDamageTakenText);
  combatLog.appendChild(log);  
}


const enemyHit = () => {
  let slimeAttack = 18+Math.floor(Math.random()*4)
  if(player.currentHp > slimeAttack){
  player.currentHp = player.currentHp - slimeAttack;
  player.display.style.width = `${player.currentHp*100 / player.hp}%`;
  player.displayValue.innerText = `${player.currentHp}`+"/"+ `${player.hp}`;
  let log = document.createElement("DIV"); 
  let playerDamageTaken = document.createTextNode("Slime attacks! You take " + slimeAttack + " damage");
  log.appendChild(playerDamageTaken);
  combatLog.appendChild(log);  
}
  else
  { player.currentHp = 0;
    player.display.style.width = `${player.currentHp*100 / player.hp}%`;
    player.displayValue.innerText = `${player.currentHp}`+"/"+ `${player.hp}`;
    setTimeout(loseMessage, 500);
    setTimeout(endGame, 500);}
}

const winMessage = () =>{
  alert("A winner is you! Refresh the page to play again.")
}

const loseMessage = () =>{
  alert("YOU DIED. Refresh to attempt again.")
}

const winTheGame = () => {
  setTimeout(winMessage, 500);
  setTimeout(endGame, 500);}

const endGame = () => {
  let y = document.querySelector(".ingame2");
  y.style.display = "none";
}

const charge = () => {
  if(currentWeapon.name === "Ugly Spectacles")
    {renderGlassesUseless()}
    else
    {
      if(Math.random() <= currentWeapon.hitRate){
        if(Math.random() <= currentWeapon.critRate)
        {
          let damage = currentWeapon.attack*4;
          if (monster.currentHp >= damage){
          monster.currentHp = monster.currentHp - damage;}
          else
          {monster.currentHp = 0}
          renderCombatHitCrit(damage)
          renderMonsterHP()
        }
        else
        {let damage = currentWeapon.attack*2;
          if (monster.currentHp >= damage){
            monster.currentHp = monster.currentHp - damage;}
            else
            {monster.currentHp = 0}
        renderCombatHitDamage(damage)
        renderMonsterHP()
      }}
      else
      {
        renderCombatHitMiss()
      }
    if (monster.currentHp <= 0)
    {winTheGame()}
    }
    enemyHit()
    randomWeapon()
  }

const poison = () => {
  if(currentWeapon.name === "Ugly Spectacles")
  {renderGlassesUseless()}
  else
  {for (let hit = 0; hit < currentWeapon.attackSpeed; hit++) {
    
    if(Math.random() <= currentWeapon.hitRate){
      if(Math.random() <= currentWeapon.critRate)
      {
        let damage = currentWeapon.attack*5;
        if (monster.currentHp >= damage){
        monster.currentHp = monster.currentHp - damage;}
        else
        {monster.currentHp = 0}
        renderCombatHitCrit(damage)
        renderMonsterHP()
      }
      else
      {let damage = currentWeapon.attack*1;
        if (monster.currentHp >= damage){
          monster.currentHp = monster.currentHp - damage;}
          else
          {monster.currentHp = 0}
      renderCombatHitDamage(damage)
      renderMonsterHP()
    }}
    else
    {
      renderCombatHitMiss()
    }
  if (monster.currentHp <= 0)
  {winTheGame()}
  }
  
  }
  enemyHit()
  randomWeapon()
}

const fire = () => {
  if(currentWeapon.name === "Ugly Spectacles")
  {renderGlassesUseless()}
  else
  {for (let hit = 0; hit < currentWeapon.attackSpeed; hit++) {
    
    if(Math.random() <= currentWeapon.hitRate){
      if(Math.random() <= currentWeapon.critRate)
      {
        let damage = currentWeapon.attack*2+15;
        if (monster.currentHp >= damage){
        monster.currentHp = monster.currentHp - damage;}
        else
        {monster.currentHp = 0}
        renderCombatHitCrit(damage)
        renderMonsterHP()
      }
      else
      {let damage = currentWeapon.attack+15;
        if (monster.currentHp >= damage){
          monster.currentHp = monster.currentHp - damage;}
          else
          {monster.currentHp = 0}
      renderCombatHitDamage(damage)
      renderMonsterHP()
    }}
    else
    {
      renderCombatHitMiss()
    }
  if (monster.currentHp <= 0)
  {winTheGame()}
  }
  
  }
  enemyHit()
  randomWeapon()
}

const aim = () => {
  if(currentWeapon.name === "Ugly Spectacles")
  {renderGlassesUseless()}
  else
  {for (let hit = 0; hit < currentWeapon.attackSpeed; hit++) {
    if(Math.random() <= currentWeapon.critRate)
      {
        let damage = currentWeapon.attack*2;
        if (monster.currentHp >= damage){
        monster.currentHp = monster.currentHp - damage;}
        else
        {monster.currentHp = 0}
        renderCombatHitCrit(damage)
        renderMonsterHP()
      }
      else
      {let damage = currentWeapon.attack;
        if (monster.currentHp >= damage){
          monster.currentHp = monster.currentHp - damage;}
          else
          {monster.currentHp = 0}
      renderCombatHitDamage(damage)
      renderMonsterHP()
    }

  if (monster.currentHp <= 0)
  {winTheGame()}
  }
  
  }
  enemyHit()
  randomWeapon()
}

const cry = () => {
  if(currentWeapon.name === "Ugly Spectacles"){
    let damage = 100
    if (monster.currentHp >= damage){
    monster.currentHp = monster.currentHp - damage;}
    else
    {monster.currentHp = 0;}
    renderMonsterHP()
    let log = document.createElement("DIV"); 
    let enemyDamageTakenText = document.createTextNode("You cry pitifully, the tears flow onto the glasses and laserbeams start firing at the enemy, dealing 100 damage!");
    log.appendChild(enemyDamageTakenText);
    combatLog.appendChild(log);
  }
  else
  {
    let log = document.createElement("DIV"); 
    let enemyDamageTakenText = document.createTextNode("You cry pitifully.");
    log.appendChild(enemyDamageTakenText);
    combatLog.appendChild(log);
  }
  if (monster.currentHp <= 0)
  {winTheGame()}
  else{
  enemyHit()
  randomWeapon()}
}