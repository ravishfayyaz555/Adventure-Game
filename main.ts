#! usr/bin/env node

import inquirer from "inquirer";
import chalk, { Chalk } from "chalk";

console.log(chalk.yellowBright(" \n\t******** Welcome TO Adventure Game *********\n"));

class Hero {
  name: String;
  health = 100;

  constructor(name: string) {
    this.name = name;
  }
  decreaseHealth() {
    this.health -= 25;
  }
  increseHealth() {
    this.health = 100;
  }
}
class Enemy {
  name: String;
  health = 100;

  constructor(name: string) {
    this.name = name;
  }
  decreaseHealth() {
    this.health -= 25;
  }
}
async function main() {
  const { heroName } = await inquirer.prompt({
    type: "input",
    name: chalk.gray("heroName"),
    message: chalk.blue ("please enter your hero'name:"),
  });
  const { EnemyType } = await inquirer.prompt({
    type: "list",
    name: "EnemyType",
    message:chalk.blueBright ("Select your Enemy"),
    choices: ["ZOMBIE", "SKELETON", "MONSTER"],
  });
  const hero = new Hero(heroName);
  const enemy = new Enemy(EnemyType);

  console.log(chalk.green(`${hero.name} encounters ${enemy.name}`));

  do {
    const { action } = await inquirer.prompt({
      type: "list",
      name: "action",
      message: chalk.blueBright("Choose your action"),
      choices: ["Attack", "Defend", "flee"],
    });

    switch (action) {
      case "Attack":
        const randomNum = Math.random();
        if (randomNum > 0.5) {
          hero.decreaseHealth();
          console.log(chalk.greenBright(`${hero.name} health: ${hero.health}`));
          console.log(chalk.greenBright(`${enemy.name} health: ${enemy.health}`));
          if (hero.health <= 0) {
            console.log(chalk.redBright("You are defeated! Try again"));
            return;
          }
        } else {
          enemy.decreaseHealth();
          console.log(chalk.magenta(`${hero.name} health: ${hero.health}`));
          console.log(chalk.greenBright(`${enemy.name} health: ${enemy.health}`));
          if (enemy.health <= 0) {
            console.log(chalk.yellowBright("\n\t******Congrats You Win!***********\n"));
            return;
          }
        }
        break;
    }
  } while (true);
}
main();