/*

	player turn => {
		set flags (init)
		set menu  (init)

		player
			wait for input {
				set action
				set action target
			}
		enemy
			execute AI
		
		player
			remove menu (cleanup)
		add action to animator (cleanup)
		set flags (cleanup)
		
	}

*/