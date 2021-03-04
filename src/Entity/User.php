<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Carbon\Carbon;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Core\Annotation\ApiResource;
use Ramsey\Uuid\Uuid;
use ApiPlatform\Core\Annotation\ApiProperty;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;

/**
 * @ApiResource(
 *     normalizationContext={"groups"={"user", "user:read"}},
 *     denormalizationContext={"groups"={"user", "user:write"}},
 *     attributes={"pagination_items_per_page"=8}
 * )
 * @ORM\Entity(repositoryClass=UserRepository::class)
 */
class User implements UserInterface
{
    use EntityUuid;
    
    /**
     * @ORM\Column(type="string", length=255)
     * @Groups({"user"})
     */
    private $name;
    
    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Groups({"user"})
     */
    private $email;
    
    /**
     * @var MediaObject|null
     *
     * @ORM\ManyToOne(targetEntity=MediaObject::class)
     * @ORM\JoinColumn(nullable=true)
     * @ApiProperty(iri="http://schema.org/image")
     */
    private $avatar;
    
    /**
     * @ORM\Column(type="json")
     * @Groups({"user"})
     */
    private $roles = [];
    
    /**
     * @var string The hashed password
     * @ORM\Column(type="string")
     */
    private $password;
    
    /**
     * @ORM\Column(type="datetime", nullable=true)
     * @Groups({"user:write"})
     */
    private $lastLogin;
    
    /**
     * @var string|null
     * @Groups({"user:write"})
     */
    private $plainPassword;
    
    public function __construct()
    {
        $this->uuid = Uuid::uuid4();
    }
    
    public function getName(): ?string
    {
        return $this->name;
    }
    
    public function setName(string $name): self
    {
        $this->name = $name;
        
        return $this;
    }
    
    public function getEmail(): ?string
    {
        return $this->email;
    }
    
    public function setEmail(string $email): self
    {
        $this->email = $email;
        
        return $this;
    }
    
    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->email;
    }
    
    
    public function getAvatar(): ?string
    {
        return $this->avatar;
    }
    
    public function setAvatar(?string $avatar): self
    {
        $this->avatar = $avatar;
        
        return $this;
    }
    
    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';
        
        return array_unique($roles);
    }
    
    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        
        return $this;
    }
    
    /**
     * @see UserInterface
     */
    public function getPassword(): string
    {
        return (string) $this->password;
    }
    
    public function setPassword(string $password): self
    {
        $this->password = $password;
        
        return $this;
    }
    
    /**
     * @see UserInterface
     */
    public function getSalt()
    {
        // not needed when using the "bcrypt" algorithm in security.yaml
    }
    
    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        $this->plainPassword = null;
    }
    
    public function getLastLogin(): ?Carbon
    {
        return $this->lastLogin;
    }
    
    public function setLastLogin(?Carbon $lastLogin): self
    {
        $this->lastLogin = $lastLogin;
        
        return $this;
    }
    
    /**
     * @Groups({"user:read"})
     *
     * @return array
     */
    public function getLastLoginDate(): array
    {
        return [
            'date' => $this->getLastLogin()->toIso8601ZuluString(),
            'humanReadable' => $this->getLastLogin()->diffForHumans()
        ];
    }
}
