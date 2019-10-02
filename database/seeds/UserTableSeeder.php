<?php

use App\Models\User;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            "name" => "Esmail Shabayek" ,
            "email" => "esmail.shabayek@gmail.com" ,
            "isAdmin" => 1,
            "password" => '$2y$10$aNqodbsR46KFfWOSkAWgd.2ZLbWL8Fqm2nO.MAqgbOD4YXtuFDrh6' // 12345678
        ]);
    }
}