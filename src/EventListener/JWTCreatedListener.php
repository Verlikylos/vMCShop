<?php


namespace App\EventListener;

use App\Entity\User;
use Carbon\Carbon;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTCreatedEvent;

class JWTCreatedListener
{
    private EntityManagerInterface $em;
    
    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->em = $entityManager;
    }
    
    public function onJWTCreated(JWTCreatedEvent $event)
    {
        $user = $event->getUser();
    
        if (!$user instanceof User) {
            return;
        }
        
        $user->setLastLogin(Carbon::now());
        
        $this->em->flush();
        
        $payload = $event->getData();
        $payload['uuid'] = $user->getUuid()->toString();
        $payload['name'] = $user->getName();
        
        $event->setData($payload);
    }
}
