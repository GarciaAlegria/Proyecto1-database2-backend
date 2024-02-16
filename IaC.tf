terraform {
    required_providers {
        digitalocean = {
            source  = "digitalocean/digitalocean"
            version = "~> 2.0"
        }
    }
}

variable "TOKEN_TERRAFORM" {
  description = "Optionally say something about this variable"
}

provider "digitalocean" {
    token = var.TOKEN_TERRAFORM
}

variable "SSH_KEYS" {
  description = "Optionally say something about this variable"
}

resource "digitalocean_droplet" "web" {
    image = "ubuntu-20-04-x64"
    name = "backend"
    region = "sfo3"
    size = "s-1vcpu-1gb"
    ssh_keys = [var.SSH_KEYS]

    provisioner "remote-exec" { 

        connection {
            type     = "ssh"
            user     = "root"
            private_key = file("~/.ssh/id_rsa")
            host     = self.ipv4_address
        }
        
        inline = [
            "sudo apt update",
            "sudo apt install -y curl",
            "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash",
            "export NVM_DIR=\"$HOME/.nvm\"",
            "[ -s \"$NVM_DIR/nvm.sh\" ] && \\. \"$NVM_DIR/nvm.sh\"",
            "nvm install lts/hydrogen",
            "git clone https://github.com/estebandonis/ProyectoFinal-IngenieriaDeSoftware-backend.git",
            "cd ProyectoFinal-IngenieriaDeSoftware-backend/",
            "npm install",
        ]
    }
}