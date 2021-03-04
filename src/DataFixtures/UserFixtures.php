<?php

namespace App\DataFixtures;

use App\Entity\User;
use Carbon\Carbon;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Faker\Generator;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserFixtures extends Fixture
{
    private UserPasswordEncoderInterface $passwordEncoder;
    private Generator $faker;
    
    public function __construct(UserPasswordEncoderInterface $passwordEncoder)
    {
        $this->passwordEncoder = $passwordEncoder;
        $this->faker = Factory::create('pl_PL');
    }
    
    public function load(ObjectManager $manager)
    {
        $user = new User();
        $user->setName('Verlikylos');
        $user->setEmail('contact@verlikylos.dev');
        $user->setAvatar('https://forum.lvlup.pro/user_avatar/forum.lvlup.pro/verlikylos/120/2857_2.png');
        $user->setLastLogin(Carbon::instance($this->faker->dateTimeBetween('-10 months', 'now')));
        $user->setPassword($this->passwordEncoder->encodePassword($user, 'password'));
        
        $manager->persist($user);
        
        for ($i = 0; $i < 29; $i++) {
            $user = new User();
            $userName = $this->faker->userName;
            
            $user->setName($userName);
            $user->setEmail($this->faker->safeEmail);
            $user->setAvatar($this->faker->boolean ? null : ('https://via.placeholder.com/50.png?text=' . strtoupper(substr($userName, 0, 1))));
            $user->setLastLogin(Carbon::instance($this->faker->dateTimeBetween('-10 months', 'now')));
            $user->setPassword($this->passwordEncoder->encodePassword($user, strtolower($userName)));
            
            $manager->persist($user);
        }

        $manager->flush();
    }
}
