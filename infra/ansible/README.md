# Ansible deployment for daposba-client

This playbook provisions a clean Debian/Ubuntu VPS, installs Node.js 20.x, pulls dotfiles from your repository, builds the Next.js app, and exposes it through a systemd service.

## Before you run the playbook

1. Edit `inventory.ini` next to `ansible.cfg` and replace the placeholder host details with your VPS IP, remote user, and the SSH private key you want Ansible to use.
2. Point `repo_url` (and optionally `repo_branch`) inside `site.yml` at the Git repository you want to deploy. Ensure the key used by Ansible has read access to that repo.
3. Adjust `env_vars` in `site.yml` to set every environment variable your app requires (for example, `NEXT_PUBLIC_API_URL`). The template in `templates/env.production.j2` will render them into `.env.production` on the server.
4. Make sure the target machine has Python 3 installed (Ansible needs it) and that the SSH key added to `inventory.ini` is recognized by the VPS.

## Running the deployment

Run the playbook with the command you usually use:

```
ansible-playbook -i infra/ansible/inventory.ini infra/ansible/site.yml
```

The playbook:
- Updates apt, installs curl/git/build-essential, and installs Node.js 20 via Nodesource.
- Clones the repo as the remote SSH user into `/var/www/daposba-client`.
- Runs `npm ci` and `npm run build` inside the repo.
- Writes `.env.production` using the variables you defined.
- Renders a systemd unit that runs `npm run start -- -p 3000` (port taken from `app_port`).
- Enables and restarts the service.

## Verification

On the VPS, you can check the service and logs:

```
systemctl status daposba-client
journalctl -u daposba-client -f
```

If you use a reverse proxy (nginx, Caddy), point it to `http://127.0.0.1:3000` (or to the port you configured).
