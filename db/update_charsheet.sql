UPDATE charsheet 
SET 
str=$3, dex=$4, con=$5, intel=$6, wis=$7, cha=$8, perception=$9, inspiration=$10, 
prof_bonus=$11, str_st=$12, dex_st=$13, con_st=$14, int_st=$15, wis_st=$16, cha_st=$17, 
acrobatics=$18, animal_handling=$19, arcana=$20, athletics=$21, deception=$22, history=$23, 
insight=$24, intimidation=$25, investigation=$26, medicine=$27, nature=$28, performance=$29, persuasion=$30, religion=$31, sleight_of_hand=$32, stealth=$33, survival=$34, 
charclass=$35, charlevel=$36, race=$37, background=$38, alignment=$39, playername=$40, exp=$41, ac=$42, 
initiative=$43, speed=$44, hp_max=$45, hp=$46, temp_hp=$47, hitdice_total=$48,
hitdice=$49, deathsave_successes=$50, deathsave_failures=$51, attacks_spellcasting=$52, 
equipment=$53, copper=$54, silver=$55, gold=$56, platinum=$57, personality=$58, ideals=$59, 
bonds=$60, flaws=$61, features_traits=$62, languages_proficiencies=$63



WHERE player=$1 AND game=$2;