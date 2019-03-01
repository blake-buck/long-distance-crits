INSERT INTO charsheet(player, game)
    VALUES ($1, $2);

UPDATE charsheet 
SET 
str='', dex='', con='', intel='', wis='', cha='', perception='', inspiration='', 
prof_bonus='', str_st='', dex_st='', con_st='', int_st='', wis_st='', cha_st='', 
acrobatics='', animal_handling='', arcana='', athletics='', deception='', history='', 
insight='', intimidation='', investigation='', medicine='', nature='', performance='', persuasion='', religion='', sleight_of_hand='', stealth='', survival='', 
charclass='', charlevel=1, race='', background='', alignment='', playername='', exp=0, ac='', 
initiative='', speed='', hp_max='', hp='', temp_hp='', hitdice_total='',
hitdice='', deathsave_successes=0, deathsave_failures=0, attacks_spellcasting='', 
equipment='', copper=0, silver=0, gold=0, platinum=0, personality='', ideals='', 
bonds='', flaws='', features_traits='', languages_proficiencies='', character_name=''

WHERE player=$1 AND game=$2;