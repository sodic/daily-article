#!/bin/sh

create_service () {
    echo "Creating a systemd service file."
    sed -e "s|#project_root#|$PWD|" daily-article.service.template \
        > daily-article.service
    sudo cp daily-article.service /etc/systemd/system/
    sudo chmod 644 /etc/systemd/system/daily-article.service
}

enable_on_startup () {
    echo "Enabling the daily-article service on startup."
    sudo systemctl enable daily-article.service
}

stop_installation() {
    echo "Stopping installation."
    exit
}

start_service() {
    sudo systemctl start daily-article.service
    echo "Started the daily-article service."
}

choice () {
    message="$1"
    yes_option="$2"
    no_option="$3"
    while true; do
        read -p "$message (y/n) " yn
        case $yn in
            [Yy]* )
                "$yes_option"
                break
            ;;
            [Nn]* )
                "$no_option"
                break
            ;;
            * )
                echo "Please answer yes or no.";;
        esac
    done
}

main() {
    create_service
    choice "Enable the service on startup?" enable_on_startup stop_installation
    choice "Start the service now?" start_service exit
}

main
