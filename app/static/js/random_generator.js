$(document).ready(function(){
                var length = 8,
                charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                retVal = "";
                for (var i = 0, n = charset.length; i < length; ++i) {
                    retVal += charset.charAt(Math.floor(Math.random() * n));
                }
                $("#room").val(retVal);

                var wordlist1 = ["Cool","Masked","Bloody","Lame","Big","Stupid","Drunk","Rotten",
                                "Blue","Black","White","Red","Purple","Golden","Silver"];

                var wordlist2 = ["Hamster","Moose","Lama","Duck","Bear","Eagle","Tiger",
                                "Rocket","Bullet","Knee","Foot","Hand"]

                // Random numbers are made
                var randomNumber1 = parseInt(Math.random() * wordlist1.length);
                var randomNumber2 = parseInt(Math.random() * wordlist2.length);
                var name = wordlist1[randomNumber1] + " " + wordlist2[randomNumber2];

                $("#name").val(name);
 });