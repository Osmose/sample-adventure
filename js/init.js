;(function(Adventure) {
    window.addEventListener('load', function() {
        var adv = new Adventure(document.getElementById('adventure'), 'start');

        adv.room('start', function() {
            if (!adv.hasVisited('start')) {
                adv.say("You breathe in deeply, tasting the sharp chill in the air. It's the middle of winter, and the fresh air is a nice change from the stuffy atmosphere of the inn you stayed at last night.");
            }

            adv.say("You stand outside the entrance to a cavern. To the north lies the opening that leads underground. In all other directions lies dense forest.")
        }, {
            north: 'cavern-entrance',
            south: 'forest',
            east: 'forest',
            west: 'forest'
        });

        adv.room('cavern-entrance', function() {
            adv.say("You are standing inside a large cavern. A chill breeze blows in from the entrance to the south. To the north lies a narrow passageway that leads downward, deeper into the earth. To the west, you see a wider passage that leads to another open area.");
            if (!adv.playerHas('torch')) {
                adv.say('You notice a flickering light from the western path.');
            }
        }, {
            south: 'start',
            west: 'torch-room',
            north: 'narrow-passage'
        });

        adv.room('torch-room', function() {
            var msg = "You are in a small open area to the west of the cavern entrance. ";
            if (!adv.playerHas('torch')) {
                msg += "The room is lit by a torch sitting in a cast iron sconce bolted to the wall.";
            } else {
                msg += "Upon one of the walls you see an empty cast iron sconce.";
            }
            adv.say(msg);
        }, {
            east: 'cavern-entrance',
            items: {
                torch: function() {
                    adv.say('You remove the torch from the sconce.');
                    adv.score += 10;
                }
            }
        });

        adv.room('narrow-passage', function() {
            if (adv.playerHas('torch')) {
                adv.say("You are in a narrow passageway that slopes downward to the north, leading deeper into the cavern. To the south it slopes upward into the entryway of the cavern.");
            } else {
                adv.say("The light from the entrance fails to reach down the sloped path, and there is only darkness beyond. You hear growling coming from the darkness.");
                adv.say("The path continues north into the darkness, and the entrance to the cavern lies to the south.");
            }
        }, {
            north: 'chamber-of-secrets',
            south: 'cavern-entrance'
        });

        adv.room('chamber-of-secrets', function() {
            if (!adv.playerHas('torch')) {
                adv.say("Thinking yourself clever, you take out your anti-grue pocket knife and charge screaming into the darkness. Alas, there is no grue here. Instead you are mauled to death by a pack of starved founders.");
                adv.say("As they swarm over you, you hear them shouting gibberish, such as \"I just launched my MVP a week ago, we've got social proof!\" and \"We were promised 2 million in convertable note if we moved to the Bay!\"");
                adv.say("Next time, consider bringing a torch, or at least attempting to ward them off with a handshake deal. As long as you follow protocol, they'll believe anything you say.");
                adv.endGame();
            } else {
                adv.say("You are standing in the final chamber of the cave (it's not that epic of a quest). Printouts of emails are mounted on the wall. Each is a creative piece of fiction that announces a regular gathering of minds to share their ideas of and projects while partaking in alcoholic beverages.");
                adv.say("In the middle of the room is a chest. To the south is the passageway leading back to the entrance.");
            }
        }, {
            south: 'narrow-passage',
            extraCommands: {
                "open chest": function() {
                    adv.prompt('You find that the chest is unlocked. Within it you find a cell phone which immediately starts ringing. As you answer it, a deep and mysterious voice whispers a short phrase...', function() {
                        document.getElementById('endmsg').className = 'show';
                    });
                }
            }
        });

        adv.room('forest', function() {
            adv.say("You plunge into the forest, abandoning your quest within the cavern. Unfortunately for you, night arrives before you can make your way back to town. The walk up to the cavern took more out of you than you realized; you quickly lose your bearings are become lost in the woods.");
            adv.say("It's three days later when they finally find your body. Disgusted with your failure, the townfolk blacken your name. As word spreads throughout the land about how you've failed, your family publicly disowns you and your assets are sold off to the lowest bidder. Your partner and child live out the rest of their days in shame, forever marred by the tarnished legacy that you left behind.");
            adv.say("You died a quitter, and received a quitter's death. Perhaps you will try harder next time.");
            adv.endGame(true);
        });

        adv.start();
    }, false);
})(window.Adventure);
