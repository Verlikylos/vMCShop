<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\UuidInterface;
use Ramsey\Uuid\Doctrine\UuidGenerator;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Annotation\ApiProperty;

trait EntityUuid
{
    /**
     * The internal primary identity key.
     *
     * @var UuidInterface
     *
     * @ORM\Column(type="uuid", unique=true)
     * @ORM\GeneratedValue(strategy="CUSTOM")
     * @ORM\CustomIdGenerator(class=UuidGenerator::class)
     * @ApiProperty(identifier=true)
     * @Groups({"user"})
     */
    protected $uuid;
    
    /**
     * The unique auto incremented primary key.
     *
     * @var int|null
     *
     * @ORM\Id
     * @ORM\Column(type="integer", options={"unsigned": true})
     * @ORM\GeneratedValue
     * @ApiProperty(identifier=false)
     */
    protected $id;
    
    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getUuid(): UuidInterface
    {
        return $this->uuid;
    }
}
