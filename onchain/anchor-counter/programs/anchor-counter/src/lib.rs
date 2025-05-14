use anchor_lang::prelude::*;

declare_id!("BM1DeSd5JUE7FeBN32KLJszP81sqC9wbctLtC61TnEg3");

#[program]
pub mod anchor_counter {
    use super::*;

    pub fn initialize(ctx:Context<Initialize>)->Result<()>{
        let counter = &mut ctx.accounts.counter;
        counter.count=0;
        msg!("Account initialized with count: {}", counter.count);
        Ok(())
    }

    pub fn increment(ctx:Context<Update>)->Result<()>{
        let counter = &mut ctx.accounts.counter;
        msg!("Current count:{}", counter.count);
        counter.count += 1;
        msg!("Count incremented to: {}", counter.count);
        Ok(())
    }

    pub fn decrement(ctx:Context<Update>)->Result<()>{
        let counter = &mut ctx.accounts.counter;
        msg!("Current count:{}", counter.count);
        counter.count-=1;
        msg!("Count decremented to: {}", counter.count);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init,
    payer = user,
    space = DISCRIMINATOR + Counter::INIT_SPACE
    )]
    pub counter: Account<'info,Counter>,
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info,System>,
    
}
#[derive(Accounts)]
pub struct Update<'info>{
    #[account(mut)]
    pub counter: Account<'info,Counter>,
    pub user: Signer<'info>,
}
#[account]
#[derive(InitSpace)]
pub struct Counter {
    pub count: u64,
}

const DISCRIMINATOR: usize= 8;
