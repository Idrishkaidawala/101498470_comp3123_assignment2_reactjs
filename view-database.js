const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function showDatabase() {
    try {
        await client.connect();
        const db = client.db('employee_db');

        console.log('\n========================================');
        console.log('   EMPLOYEE MANAGEMENT SYSTEM DATABASE');
        console.log('========================================\n');

        // Show Users
        console.log('📋 USERS COLLECTION');
        console.log('------------------');
        const users = await db.collection('users').find().toArray();
        console.log(`Total Users: ${users.length}\n`);

        users.forEach((user, index) => {
            console.log(`User #${index + 1}:`);
            console.log(`  ID: ${user._id}`);
            console.log(`  Username: ${user.username}`);
            console.log(`  Email: ${user.email}`);
            console.log(`  Password: ${user.password.substring(0, 20)}... (hashed)`);
            console.log(`  Created: ${user.created_at}`);
            console.log('');
        });

        // Show Employees
        console.log('\n👥 EMPLOYEES COLLECTION');
        console.log('----------------------');
        const employees = await db.collection('employees').find().toArray();
        console.log(`Total Employees: ${employees.length}\n`);

        employees.forEach((emp, index) => {
            console.log(`Employee #${index + 1}:`);
            console.log(`  ID: ${emp._id}`);
            console.log(`  Name: ${emp.first_name} ${emp.last_name}`);
            console.log(`  Email: ${emp.email}`);
            console.log(`  Position: ${emp.position}`);
            console.log(`  Department: ${emp.department}`);
            console.log(`  Salary: $${emp.salary.toLocaleString()}`);
            console.log(`  Date of Joining: ${new Date(emp.date_of_joining).toLocaleDateString()}`);
            console.log(`  Profile Picture: ${emp.profile_picture || 'None'}`);
            console.log(`  Created: ${emp.created_at}`);
            console.log(`  Updated: ${emp.updated_at}`);
            console.log('');
        });

        console.log('========================================\n');

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
    }
}

showDatabase();
