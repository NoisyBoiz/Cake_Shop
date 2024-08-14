import Sequelize from 'sequelize';


const Connection = async () => {
    const sequelize = new Sequelize('postgres', 'postgres.anyugtuaguobciopkhcl', 'MyvzEZF$DYt47i4', {
            host: 'aws-0-ap-southeast-1.pooler.supabase.com',
            dialect: 'postgres'
        }
    )
    try{
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    }
    catch(error){
        console.error('Unable to connect to the database:', error);
    }
    return sequelize
}

export default Connection;