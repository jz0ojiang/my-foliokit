---
title: illusion
date: 2022-09-14
description: Asymmetric competitive game design and implementation in Minecraft
endDate: present
cover: https://image.im0o.top/2025/202505181013717.webp
tags:
  - illusion#F49D37
  - Minecraft#7FB069
link: https://illusion.im0o.top
top: false
draft: false
weight: 5
no_ai: false
abbrlink: c7d9e3f5
---

## Project Background

![](https://image.im0o.top/2024/202504282218906.png)

illusion is an original Minecraft competitive map centered around asymmetric gameplay mechanics.

Players are divided into two factions: `Survivors` and `Killers`, engaging in intense and strategic matches within a psychedelic and dangerous space.

---

As a fan of asymmetric competitive games and a Minecraft player, I first attempted to implement asymmetric gameplay in Minecraft 1.12.2 in April 2019, starting a map project called "彼岸花开" (v0.1.0). This version attempted to recreate Dead by Daylight's mechanics, featuring a special health system, downed state, hook system, and simulated "generator" interactions by having players place ender eyes in portals, which later became the prototype for the "offering box" mechanic.

![](https://image.im0o.top/2024/202505120223854.webp)

However, the project was suspended in early 2020 due to lack of continued development, failing to achieve complete gameplay.

---

In 2021, I met another Minecraft player who also loved asymmetric competitive gameplay. Learning that he was attempting to recreate similar mechanics in NetEase Minecraft Bedrock Edition, we collaborated on a new map, casually named "网易鬼抓人" (v0.2.0).

![](https://image.im0o.top/2024/202505120137614.png)
![](https://image.im0o.top/2024/202505120137670.png)

In this version, we made many interesting attempts, such as unique chunk random generation mechanics, which formed the initial prototype of illusion's core gameplay. Although the overall design wasn't standardized, it was very fun as our private project.

Unfortunately, due to save file loss, this version also ended regrettably.

---

We attempted several restarts but failed for various reasons. Until September 14, 2022, we officially restarted on Minecraft 1.19.2, naming it **illusion** (v0.3.0).

This version completely redesigned the mechanics while drawing from v0.2.0's experience. For example, instead of developing an additional health system, we directly used the vanilla health bar; removed the downed and hook systems, replacing them with "direct cage entry upon death," simplifying logic and improving pace.

Despite experiencing long periods of hiatus and restructuring, after three years, we finally delivered a work we were satisfied with.

## Map Design

illusion's map design is very clever. To ensure each game feels fresh, the map is randomly generated based on certain configurations.

By randomly copying structures from preset templates into the play area according to specific logic, we achieve highly randomized map content.

I wrote a blog post about this mechanism, which you can check out if interested:

[Minecraft JE: Random Chunk-Based Map Generation Design - illusion's Implementation](https://blog.im0o.top/posts/da8bb269.html)

Simply put, it uses preset templates to randomly generate maps under the condition of using random number generators.

![](https://image.im0o.top/2024/20241210155654.gif)

![](https://image.im0o.top/2024/20241210163351.png)

## Gameplay Design

The game is divided into two factions: `Survivors` and `Killers`, each with unique characters.

Survivors need to complete at least 8 offering box offerings, place the obtained candles in the gate candlesticks to open the gate and escape.

Killers need to prevent survivors from escaping by eliminating all survivors.

## Offering Box

The offering box is a very important mechanic in illusion and one of the map's unique features.

There are 7 offering boxes on the field. Completing an offering requires depositing "copper coins" into the box until reaching a certain amount.

- When offering progress reaches 100%, the nearest survivor will receive 1 candle
- The offering box will be highlighted across the map for a period
- After reaching 100%, the offering box will automatically recover when no survivors are nearby, becoming available again after a period
- Killers approaching a recovering offering box will cause its progress to regress

- Copper Coin Spawn Mechanism
    
    Copper coins spawn within a certain range of players and disappear after a period
    
    Copper coin drops near killers automatically disappear

## Offering Speed

Offering speed is related to surviving survivors. When someone is eliminated, other survivors' offering speed increases accordingly.

Each player's offering speed = Total offering speed / (Total players - Eliminated players)

## Gate

After inserting 4 candles into each of the gate's 2 candlesticks (8 candles total), the gate enters an opening state.

Standing within the range of an opening gate's candlesticks until the progress bar completes will open the gate.

Killers in range will cause the progress bar to regress.

## Elimination

Survivors are teleported into cages in the elimination area upon death.

Survivors in cages will continuously accumulate elimination progress, divided into 3 stages:

- Stage 1 (First time entering cage)
- Stage 2 (Elimination progress above 50%)
- Stage 3 (Elimination)

Survivors who are rescued and then killed will directly enter the next stage.

## Footprints

Survivors leave visible white particle effect trails during matches.

These trails are only visible to killers.

Survivors don't leave trails while crouching.

- Implementation Principle
    
    Generates an effectless footprint marker potion cloud at standing survivors' positions every second, lasting 5 seconds
    
    Generates particle effects at all footprint marker potion cloud locations
    
    Generates more particle effects at footprint marker potion clouds near players

## Preparation Phase

Players join the game after selecting faction, character, and skills, implemented in a clever way.

Survivors and killers each have a preparation area. Entering grants a preparation state, marking them as prepared players.

In vanilla Minecraft, floating text (armor stand names) cannot be interpolated/modified, so theoretically, dynamic prepared player count display is impossible.

However, I used sign text content to achieve dynamic text display, then copied the sign's text NBT to the floating text, thus achieving dynamic prepared player count display.

## Core Implementation Logic

Here's the core logic of the in-game mechanics. I implemented several important mechanisms:

1. Loop Execution Function

2. Trigger System

3. Timer System

### Loop Execution Function

The loop execution function works by using the schedule command, calling itself within the executed function to achieve continuous execution.

### Trigger System (Handler)

The trigger system (handler) is so important in illusion that it can be said to run through the entire map's implementation. Almost all mechanics rely on triggers.

For all in-game mechanics/events, I call preset trigger functions to execute required logic, greatly decoupling the code and making it clearer.

### Timer System

The timer system is the foundation for implementing numerous cooldown skills in illusion. Almost all cooldown skills use timers.

Timer implementation is based on loop execution functions and scoreboards, using scoreboards to record remaining time, thus achieving cooldown timing functionality.

## Player Spawn

Players spawn at randomized spawn points after joining the game.

- Spawn Point Principle
    
    Randomly select a point from the map as a reference point (bpoint)
    
    - Use the reference point as one of the survivor spawn points
    - Select the point farthest from the reference point as the killer spawn point
    - Select the 3 points closest to but at least 32 blocks away from the reference point as other survivor spawn points

These mechanics are implemented using only vanilla target selectors, with simple logic but significant effects.

## Match Resolution

After triggering resolution judgment, match outcome is determined by the following conditions:

- 【Killer Victory】Eliminated survivors outnumber escaped survivors, and no survivors remain on field
- 【Draw】Eliminated survivors equal escaped survivors, and no survivors remain on field
- 【Survivor Victory】Eliminated survivors are fewer than escaped survivors, and no survivors remain on field

* Active survivors: Survivors who can move freely during the match

Resolution judgment is triggered after the following events:

- A survivor is eliminated
- A survivor successfully escapes

## Legacy Skills

Inspired by Dead by Daylight, characters initially have 3 legacy skills.

All players can freely choose from multiple skills, carrying up to 4 skills into matches.

First-time play with a character unlocks skill legacy. Legacy skills can be carried when using other characters.

## Character Design

As of v0.4.3-beta, illusion has updated with 4 killers and 8 survivors.

Each killer has unique exclusive powers, making them distinct and deadly.

| Character | Type |
| --- | --- |
| illusion-Plague Doctor | Killer |
| illusion-Gardener | Killer |
| illusion-Weeping Angel | Killer |
| illusion-Hunter | Killer |
| illusion-Believer | Survivor |
| illusion-"Consultant" | Survivor |
| illusion-Athlete | Survivor |
| illusion-Gambler | Survivor |
| illusion-Expert | Survivor |
| illusion-Street Walker | Survivor |
| illusion-Feng Shui Master | Survivor |
| illusion-Caregiver | Survivor |

## Tutorial Mode

illusion features a very detailed tutorial mode, helping players quickly get started. All mechanics have detailed tutorials.

![](https://upyun-uss-cdn.im0o.cn/illusion-images/2025-04-3011_19_50-ezgif.com-gif-to-webp-converter.webp)

![](https://upyun-uss-cdn.im0o.cn/illusion-images/2025-04-3011_21_43-ezgif.com-gif-to-webp-converter.webp)

![](https://upyun-uss-cdn.im0o.cn/illusion-images/2025-04-3011_29_55-ezgif.com-optiwebp.webp)

![](https://upyun-uss-cdn.im0o.cn/illusion-images/2025-04-3011_28_21-ezgif.com-webp-maker.webp)

![](https://upyun-uss-cdn.im0o.cn/illusion-images/2025-04-3011_32_35-ezgif.com-optiwebp.webp)

## Skill Design

Skill design is a very important part of illusion, with each character having unique skills.

Skill design is based on triggers, implementing skill activation through triggers.

## Official Website

illusion's official website was developed by me using Nuxt.js, featuring a full-screen video as the first-screen background and some animation effects to enhance visual appeal.

You can check out the website here:

[illusion Official Website](https://illusion.im0o.top)

## PV Videos

As the map updated, I created multiple PV videos, with the first half focusing on Minecraft animations and the second half introducing map/character gameplay.

<iframe 
  src="https://player.bilibili.com/player.html?bvid=BV1PSoRY7E9o&autoplay=0" 
  scrolling="no" 
  frameborder="no" 
  allowfullscreen="true" 
  width="100%" 
  height="500px">
</iframe>

<iframe 
  src="https://player.bilibili.com/player.html?bvid=BV14BGZzdEVU&autoplay=0" 
  scrolling="no" 
  frameborder="no" 
  allowfullscreen="true" 
  width="100%" 
  height="500px">
</iframe>

<iframe 
  src="https://player.bilibili.com/player.html?bvid=BV16pV4zbEhU&autoplay=0" 
  scrolling="no" 
  frameborder="no" 
  allowfullscreen="true" 
  width="100%" 
  height="500px">
</iframe>

## Future Plans

- Minestom server version plan
- Collaboration with content creators for promotion (bilibili / Box Map Platform)
- Commercialization and potential cooperation with mini-game platforms 